'use client'

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
            <span>Entrée</span>
          </div>
        </div>
      </div>

      
    </div>
  );
};
