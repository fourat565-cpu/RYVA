import { motion } from "framer-motion";
import { LayoutDashboard, Package, Users, BarChart3, Plus, Search, MoreVertical, TrendingUp, DollarSign } from "lucide-react";
import { PRODUCTS } from "../constants/products";

export default function AdminDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 min-h-screen px-6 max-w-[1400px] mx-auto pb-24"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="space-y-4">
          <h2 className="text-white/20 text-xs tracking-[0.5em] font-black uppercase mb-2">Systems Online</h2>
          <h1 className="text-7xl font-display tracking-tighter uppercase leading-none">Command <br /> Center</h1>
          <p className="text-white/40 text-[10px] tracking-[0.4em] font-black uppercase">Administrative Governance</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-white text-black px-8 py-4 font-black tracking-widest text-[10px] uppercase flex items-center gap-3 hover:bg-white/90">
             <Plus size={14} /> New Product
           </button>
           <button className="border border-white/20 px-8 py-4 font-black tracking-widest text-[10px] uppercase hover:bg-white/5">
             Settings
           </button>
        </div>
      </div>

      {/* Analytics Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
         {[
           { label: "Total Revenue", val: "45,230 TND", icon: DollarSign, trend: "+12%" },
           { label: "Active Aura Clients", val: "1,240", icon: Users, trend: "+5%" },
           { label: "Pending Shipments", val: "42", icon: Package, trend: "-2%" },
           { label: "Conversion Rate", val: "3.4%", icon: BarChart3, trend: "+0.8%" },
         ].map(stat => (
           <div key={stat.label} className="luxury-glass p-8 space-y-4">
              <div className="flex justify-between items-start">
                 <div className="p-3 bg-white/5 rounded-lg"><stat.icon size={20} className="text-white/60" /></div>
                 <span className={`text-[10px] font-bold ${stat.trend.startsWith("+") ? "text-green-500" : "text-red-500"}`}>{stat.trend}</span>
              </div>
              <div>
                 <p className="text-[9px] tracking-widest font-black uppercase text-white/40 mb-1">{stat.label}</p>
                 <p className="text-3xl font-display tracking-tighter uppercase">{stat.val}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
         {/* Active Orders Table */}
         <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-display tracking-tighter uppercase">Recent Influx</h3>
               <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                  <input type="text" placeholder="FILTER ORDERS..." className="bg-white/5 border border-white/10 pl-10 pr-4 py-2 text-[9px] tracking-widest font-bold uppercase focus:outline-none focus:border-white transition-all" />
               </div>
            </div>
            <div className="luxury-glass overflow-hidden">
               <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/10">
                     <tr className="text-[9px] tracking-widest font-black uppercase text-white/40">
                        <th className="px-8 py-6">ID</th>
                        <th className="px-8 py-6">Client</th>
                        <th className="px-8 py-6">Status</th>
                        <th className="px-8 py-6">Total</th>
                        <th className="px-8 py-6">Action</th>
                     </tr>
                  </thead>
                  <tbody className="text-[11px] tracking-widest font-light">
                     {[
                       { id: "#RV-9023", name: "Ahmed Ben Amor", status: "PROCESSING", total: "189 TND" },
                       { id: "#RV-9022", name: "Yassine Dridi", status: "SHIPPED", total: "349 TND" },
                       { id: "#RV-9021", name: "Sarra Mansour", status: "PENDING", total: "129 TND" },
                       { id: "#RV-9020", name: "Mehdi Trabelsi", status: "DELIVERED", total: "219 TND" },
                     ].map(row => (
                       <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="px-8 py-6 font-bold">{row.id}</td>
                          <td className="px-8 py-6">{row.name.toUpperCase()}</td>
                          <td className="px-8 py-6 italic text-white/60">{row.status}</td>
                          <td className="px-8 py-6 font-serif">{row.total}</td>
                          <td className="px-8 py-6"><button className="p-2 hover:bg-white/10 rounded-full transition-colors"><MoreVertical size={14} /></button></td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Side Management */}
         <div className="lg:col-span-4 space-y-8">
            <h3 className="text-2xl font-display tracking-tighter uppercase">Inventory Peek</h3>
            <div className="space-y-4">
               {PRODUCTS.slice(0, 5).map(item => (
                 <div key={item.id} className="luxury-glass p-6 flex justify-between items-center group">
                    <div>
                       <p className="text-[10px] tracking-widest font-black uppercase text-white/40 mb-1">{item.name}</p>
                       <p className="text-lg font-display tracking-tighter font-bold uppercase">12 IN STOCK</p>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2 py-1 bg-green-500/20 text-green-500">
                      OK
                    </span>
                 </div>
               ))}
               <button className="w-full border border-dashed border-white/10 py-6 text-[10px] tracking-widest font-black uppercase text-white/20 hover:text-white/40 transition-all">
                 Stock Audit
               </button>
            </div>
         </div>
      </div>
    </motion.div>
  );
}

