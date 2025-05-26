import React from 'react';
import type { Annotation } from './types';

interface SidebarProps {
	annotations: Annotation[];
	onUpdate: (id: string, note: string) => void;
	onRemove?: (id: string) => void;
	className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
	annotations,
	onUpdate,
	onRemove,
	className = '',
}) => {
	return (
		<aside className={className}>
			{annotations.map(annotation => (
				<div key={annotation.id}>
					<blockquote>{annotation.text}</blockquote>
					<textarea
						value={annotation.note || ''}
						onChange={e => onUpdate(annotation.id, e.target.value)}
						placeholder='Add a note...'
					/>
					{onRemove && (
						<button onClick={() => onRemove(annotation.id)}>Remove</button>
					)}
				</div>
			))}
		</aside>
	);
};
