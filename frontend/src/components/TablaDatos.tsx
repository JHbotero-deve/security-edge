import { ReactNode } from 'react';

interface Column<T> {
  header: string;
  key: keyof T | string;
  render?: (item: T) => ReactNode;
}

interface TablaDatosProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function TablaDatos<T>({ columns, data, isLoading, emptyMessage = 'No hay suministros disponibles' }: TablaDatosProps<T>) {
  return (
    <div className="w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {columns.map((_, j) => (
                    <td key={j} className="px-6 py-6">
                      <div className="h-3 bg-slate-100 rounded-full w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center text-slate-300 font-black uppercase tracking-widest italic text-xs">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, i) => (
                <tr key={i} className="hover:bg-primary-50/30 transition-all group">
                  {columns.map((col, j) => (
                    <td key={j} className="px-6 py-5 text-[11px] text-slate-600 font-bold tracking-tight">
                      {col.render ? col.render(item) : (item as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
