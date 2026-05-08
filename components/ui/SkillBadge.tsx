interface SkillBadgeProps {
  label: string;
}

export const SkillBadge = ({ label }: SkillBadgeProps) => {
  return (
    <span className="font-body bg-surface border border-border text-muted text-[11px] px-3 py-1 rounded-sm hover:border-accent/50 transition-colors cursor-default">
      {label}
    </span>
  );
};
