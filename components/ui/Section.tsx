import React from 'react';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

const Section: React.FC<SectionProps> = ({ id, children, className = '', containerClassName = '' }) => {
  return (
    <section id={id} className={`py-20 relative overflow-hidden ${className}`}>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;