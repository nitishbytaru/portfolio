// src/components/ui/MiniInfoCard.jsx
import React from "react";

/**
 *   <MiniInfoCard icon={Briefcase} title="Internship" value="Infosys" />
 */
const MiniInfoCard = ({ icon: Icon, title, value }) => (
  <div className="rounded-2xl border border-border bg-surface/80 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
    {Icon && <Icon className="mb-3 h-5 w-5 text-primary" />}
    <p className="mb-1 text-xs uppercase tracking-wide text-text-secondary">{title}</p>
    <p className="text-sm font-semibold leading-snug text-text">{value}</p>
  </div>
);

export default MiniInfoCard;
