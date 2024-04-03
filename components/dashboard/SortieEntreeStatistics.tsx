'use client'
import { LineChart } from "@mui/x-charts/LineChart";
export const SortieEntreeStatistics = () => {
  return (
    <div className="p-8 w-[700px]">
      <div className="flex items-center justify-between">
        <h1 className="text-white capitalize font-bold text-2xl">statistiques de sorties et d&lsquo;achats</h1>
        <div className="flex items-center gap-x-4 font-medium">
          <div className="sorties text-emerald-500 flex items-center gap-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Sortie</span>
          </div>
          <div className="achats text-blue-500 flex items-center gap-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Achats</span>
          </div>
        </div>
      </div>

      <LineChart
      
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        sx={{color:'white'}}
        series={[
            { curve: "linear", data: [0, 5, 2, 6, 3, 9.3] },
            { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
        ]}
        margin={{ left: 0, right: 30, top: 100, bottom: 30 }}
        width={700}
        height={300}
      />
    </div>
  );
};
