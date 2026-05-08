interface SectionLabelProps {
  text: string;
}

export const SectionLabel = ({ text }: SectionLabelProps) => {
  return (
    <p className="font-body text-[9px] tracking-[2.5px] uppercase text-muted mb-3">
      {text}
    </p>
  );
};
