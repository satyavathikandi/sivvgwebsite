// src/components/WeeklyPnLChart.jsx
import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";
import * as XLSX from "xlsx";
import { BsDownload } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import dataFile from "../assets/newportfoliodata.xlsx";

const WeeklyPnLChart = () => {
  const [data, setData] = useState([]);
  const [traders, setTraders] = useState([]);
  const [mode, setMode] = useState("weekly");
  const [selectedTrader, setSelectedTrader] = useState("");
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const chartRef = useRef();

  const monthMap = { September: 8, October: 9, November: 10 };

  // Parse Excel date to JS Date object
  const parseExcelDate = (date) => {
    if (!date) return null;
    if (typeof date === "number") return new Date(Math.round((date - 25569) * 86400 * 1000));
    if (typeof date === "string") {
      const parts = date.split(/[\/\-]/).map((v) => v.trim());
      if (parts.length !== 3) return null;
      let [d1, d2, d3] = parts;
      let day, month;
      if (parseInt(d1) > 12) {
        day = d1;
        month = d2;
      } else {
        day = d2;
        month = d1;
      }
      const year = d3.length === 2 ? `20${d3}` : d3;
      const parsed = new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
      return isNaN(parsed.getTime()) ? null : parsed;
    }
    return null;
  };

  // Load Excel data
  useEffect(() => {
    fetch(dataFile)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        let jsonData = XLSX.utils.sheet_to_json(sheet, { raw: true });

        jsonData = jsonData.map((row) => {
          const dateObj = parseExcelDate(row.Date);
          return {
            ...row,
            Date: dateObj,
            displayDate: dateObj
              ? `${String(dateObj.getDate()).padStart(2, "0")}/${String(
                  dateObj.getMonth() + 1
                ).padStart(2, "0")}/${dateObj.getFullYear()}`
              : row.Date,
          };
        });

        const traderCols = Object.keys(jsonData[0] || {}).filter((key) =>
          key.toLowerCase().includes("percentage")
        );

        setData(jsonData);
        setTraders(traderCols);
        setSelectedTrader(traderCols[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  // Group data by 5 trading days
  const getWeeks = (monthName) => {
    const monthIndices =
      monthName === "All Months" ? Object.values(monthMap) : [monthMap[monthName]];

    const monthData = data
      .filter((d) => d.Date && monthIndices.includes(d.Date.getMonth()))
      .sort((a, b) => a.Date - b.Date);

    const weeks = {};
    let weekCounter = 1;
    for (let i = 0; i < monthData.length; i += 5) {
      weeks[`Week${weekCounter}`] = monthData.slice(i, i + 5);
      weekCounter++;
    }
    return weeks;
  };

  // Aggregate data monthly
  const getMonthlyAggregatedData = (monthName) => {
    const monthIndices =
      monthName === "All Months" ? Object.values(monthMap) : [monthMap[monthName]];

    const allData = monthIndices.flatMap((idx) => {
      const monthKey = Object.keys(monthMap).find((k) => monthMap[k] === idx);
      const weeks = getWeeks(monthKey);
      return Object.keys(weeks).map((wk) => {
        const agg = { week: wk };
        traders.forEach((t) => {
          agg[t] = weeks[wk].reduce((sum, row) => sum + (row[t] || 0), 0);
        });
        return agg;
      });
    });
    return allData;
  };

  // Display data in chart
  const displayedData = useMemo(() => {
    if (!data.length || !selectedTrader) return [];
    if (mode === "weekly") {
      if (selectedWeek) return getWeeks(selectedMonth)[selectedWeek] || [];
      return Object.values(getWeeks(selectedMonth)).flat();
    }
    if (mode === "monthly") return getMonthlyAggregatedData(selectedMonth);
    return [];
  }, [data, mode, selectedWeek, selectedMonth, selectedTrader]);

  const totalSums = useMemo(() => {
    const sums = {};
    traders.forEach((t) => {
      sums[t] = displayedData.reduce((acc, row) => acc + (row[t] || 0), 0);
    });
    return sums;
  }, [displayedData, traders]);

  // PDF Export
  const handleDownloadPDF = async () => {
    if (!selectedTrader) return alert("Select a trader first.");
    try {
      const doc = new jsPDF();
      const traderName = selectedTrader.replace("Percentage", "");

      doc.setFontSize(16);
      doc.text("SIVVG Info Tech", 14, 15);
      doc.setFontSize(13);
      doc.text(`${traderName} - ${mode.toUpperCase()} Report (%)`, 14, 23);
      doc.setFontSize(10);
      doc.text(
        `Month: ${selectedMonth}${selectedWeek ? ", Week: " + selectedWeek : ""} | Date: ${new Date().toLocaleDateString()}`,
        14,
        30
      );

      if (chartRef.current) {
        const clone = chartRef.current.cloneNode(true);
        clone.style.backgroundColor = "#0f172a";
        document.body.appendChild(clone);
        const canvas = await html2canvas(clone, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 14, 35, 180, 90);
        document.body.removeChild(clone);
      }

      const tableData =
        mode === "weekly"
          ? displayedData.map((row) => [row.displayDate || row.week || "", `${row[selectedTrader]?.toFixed(2) || 0}%`])
          : displayedData.map((row) => [row.week, `${row[selectedTrader]?.toFixed(2) || 0}%`]);

      autoTable(doc, {
        startY: 130,
        head: [["Period", `${traderName} P&L (%)`]],
        body: tableData,
        theme: "grid",
        headStyles: { fillColor: [22, 60, 150] },
        styles: { fontSize: 10, halign: "center" },
      });

      const total = totalSums[selectedTrader]?.toFixed(2) || "0.00";
      doc.text(`Total ${traderName} P&L (%): ${total >= 0 ? "+" + total : total}`, 14, doc.lastAutoTable.finalY + 10);

      doc.save(`${traderName}_${mode}_${selectedMonth}${selectedWeek ? "_" + selectedWeek : ""}.pdf`);
    } catch (err) {
      console.error(err);
      alert("PDF generation failed!");
    }
  };

  const weekButtons = useMemo(() => Object.keys(getWeeks(selectedMonth)), [data, selectedMonth]);

  return (
    <div className="w-full min-h-screen bg-[#0f172a] text-gray-100 py-8 px-3 sm:px-6 md:px-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">📊 Portfolio P&L Dashboard</h2>

      {data.length > 0 ? (
        <>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <button onClick={() => { setMode("weekly"); setSelectedWeek(null); }}
              className={`py-2 px-3 rounded ${mode === "weekly" ? "bg-green-600" : "bg-gray-800"} font-semibold`}>
              Weekly
            </button>
            <button onClick={() => { setMode("monthly"); setSelectedWeek(null); }}
              className={`py-2 px-3 rounded ${mode === "monthly" ? "bg-green-600" : "bg-gray-800"} font-semibold`}>
              Monthly
            </button>

            <select value={selectedTrader} onChange={(e) => setSelectedTrader(e.target.value)}
              className="bg-gray-800 text-white rounded px-3 py-2">
              {traders.map((t) => <option key={t} value={t}>{t.replace("Percentage", "")}</option>)}
            </select>

            <select value={selectedMonth} onChange={(e) => { setSelectedMonth(e.target.value); setSelectedWeek(null); }}
              className="bg-gray-800 text-white rounded px-3 py-2">
              <option value="All Months">All Months</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
            </select>
          </div>

          {mode === "weekly" && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <button onClick={() => setSelectedWeek(null)}
                className={`py-1.5 px-3 rounded ${selectedWeek === null ? "bg-blue-600" : "bg-gray-700"}`}>
                All Weeks
              </button>
              {weekButtons.map((wk) => (
                <button key={wk} onClick={() => setSelectedWeek(wk)}
                  className={`py-1.5 px-3 rounded ${selectedWeek === wk ? "bg-blue-600" : "bg-gray-700"}`}>
                  {wk}
                </button>
              ))}
            </div>
          )}

          <div ref={chartRef} className="w-full h-72 sm:h-96 md:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={displayedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey={mode === "weekly" ? "displayDate" : "week"} stroke="#eee" tick={{ fontSize: 10 }} />
                <YAxis stroke="#eee" tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{ backgroundColor: "#333" }} />
                <Legend wrapperStyle={{ color: "#fff" }} />
                <Bar dataKey={selectedTrader} name={`${selectedTrader.replace("Percentage", "")} (%)`} radius={[4,4,0,0]}>
                  {displayedData.map((entry, idx) => (
                    <Cell key={idx} fill={entry[selectedTrader] >= 0 ? "#34d399" : "#f87171"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center mt-6">
            <button onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-100 font-bold py-2 px-4 rounded">
              <BsDownload size={18} /> Download PDF
            </button>
          </div>
        </>
      ) : (
        <p className="text-center mt-10">Loading data...</p>
      )}
    </div>
  );
};

export default WeeklyPnLChart;
