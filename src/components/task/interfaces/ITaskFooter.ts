import React, { ChangeEvent, ReactEventHandler } from 'react';

export interface ITaskFooter {
  id: string;
  status?: string;
  onStatusChange?: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => void;
}
