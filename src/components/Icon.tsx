import React from 'react';
import * as Icons from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', size = 24 }) => {
  // Procura o ícone correspondente no dicionário do Lucide
  const LucideIcon = (Icons as any)[name];

  if (!LucideIcon) {
    // Retorna um ícone padrão (HelpCircle) caso o nome não exista
    const DefaultIcon = Icons.HelpCircle;
    return <DefaultIcon className={className} size={size} />;
  }

  return <LucideIcon className={className} size={size} />;
};
