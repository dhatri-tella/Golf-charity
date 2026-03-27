'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, LineChart, PieChart, TrendingUp, Users, Heart, Trophy, Download, Calendar, ShieldCheck } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

// Mock Data for High-Impact Visuals
const growthData = [
  { name: 'Jan', members: 400, revenue: 2400 },
  { name: 'Feb', members: 600, revenue: 3600 },
  { name: 'Mar', members: 800, revenue: 4800 },
  { name: 'Apr', members: 1200, revenue: 7200 },
  { name: 'May', members: 1500, revenue: 9000 },
  { name: 'Jun', members: 2100, revenue: 12600 },
];

const charityDonationData = [
  { name: 'Save The Children', value: 4500, color: '#FF4E4E' },
  { name: 'Green Peace', value: 3200, color: '#FFD700' },
  { name: 'Red Cross', value: 2800, color: '#32CD32' },
  { name: 'WWF', value: 1500, color: '#00BFFF' },
];

const AdminReportsPage = () => {
  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-2">
           <Badge variant="active">PLATFORM INTELLIGENCE</Badge>
           <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
             Impact <span className="text-gold">Reports.</span>
           </h1>
        </div>
        <div className="flex space-x-4">
           <Button variant="secondary" size="sm"><Calendar size={16} className="mr-2" /> Q4 2024</Button>
           <Button size="sm"><Download size={16} className="mr-2" /> Generate PDF Report</Button>
        </div>
      </div>

      {/* Top Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Total Members', value: '2,654', icon: Users, trend: '+12.4%', color: 'text-primary' },
           { label: 'Donated Total', value: '£42,850', icon: Heart, trend: '+8.2%', color: 'text-primary' },
           { label: 'Total Draws', value: '18', icon: BarChart3, trend: '95% Completion', color: 'text-white' },
           { label: 'Prize Pool Career', value: '£124,000', icon: Trophy, trend: '+15.1%', color: 'text-gold' },
         ].map((stat, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="glass-card p-8 flex flex-col justify-between group hover:border-gold/20 transition-all shadow-xl"
           >
              <div className="flex justify-between items-start">
                 <stat.icon size={24} className={stat.color} />
                 <span className="text-[10px] font-black text-gold uppercase tracking-[2px]">{stat.trend}</span>
              </div>
              <div className="mt-8 space-y-1">
                 <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-3xl font-black text-white tracking-widest leading-none">{stat.value}</p>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Charts Layer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Member Growth Chart */}
         <div className="glass-card p-8 space-y-10 shadow-2xl border-white/5">
            <div className="flex justify-between items-center">
               <h3 className="text-xs font-black text-white/40 uppercase tracking-widest flex items-center">
                  <TrendingUp size={16} className="mr-2 text-primary" /> Membership Growth
               </h3>
               <Badge variant="active">LIVE DATA</Badge>
            </div>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                     <defs>
                        <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#ff2d70" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#ff2d70" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                     <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} padding={{ left: 20, right: 20 }} />
                     <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0a0f1e', border: '1px solid #ffffff10', borderRadius: '12px' }}
                        itemStyle={{ color: '#ff2d70', fontSize: '10px' }}
                     />
                     <Area type="monotone" dataKey="members" stroke="#ff2d70" strokeWidth={3} fillOpacity={1} fill="url(#colorMembers)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Charity Contribution Bar Chart */}
         <div className="glass-card p-8 space-y-10 shadow-2xl border-white/5">
            <div className="flex justify-between items-center">
               <h3 className="text-xs font-black text-white/40 uppercase tracking-widest flex items-center">
                  <BarChart3 size={16} className="mr-2 text-gold" /> Charity Contribution Share
               </h3>
            </div>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charityDonationData} layout="vertical">
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" stroke="#ffffff40" fontSize={8} width={100} tickLine={false} axisLine={false} />
                     <Tooltip 
                        cursor={{ fill: '#ffffff05' }}
                        contentStyle={{ backgroundColor: '#0a0f1e', border: '1px solid #ffffff10', borderRadius: '12px' }}
                        itemStyle={{ fontSize: '10px' }}
                     />
                     <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                        {charityDonationData.map((entry, index) => (
                           <Cell key={index} fill={entry.color} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* Audit Log Hint */}
      <div className="p-6 border border-dashed border-white/10 bg-white/5 flex items-center justify-between text-white/40 text-[10px] font-bold uppercase tracking-widest rounded-2xl">
         <span className="flex items-center"><ShieldCheck size={14} className="mr-2 text-primary" /> All reports are cryptographically signed for regulatory compliance.</span>
         <button className="text-white hover:text-gold transition-colors border-b border-white/20 hover:border-gold pb-0.5">View Audit Logs</button>
      </div>
    </div>
  );
};

export default AdminReportsPage;
