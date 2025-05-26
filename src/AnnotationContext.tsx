import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Annotation, AnnotationContextType, Anchor } from './types';

const AnnotationContext = createContext<AnnotationContextType | null>(null);

const STORAGE_KEY = 'react-annotate-data';

export const AnnotationProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [annotations, setAnnotations] = useState<Annotation[]>(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(annotations));
	}, [annotations]);

	const add = (anchor: Anchor) => {
		setAnnotations(prev => [...prev, { ...anchor, id: uuidv4() }]);
	};

	const update = (id: string, note: string) => {
		setAnnotations(prev =>
			prev.map(ann => (ann.id === id ? { ...ann, note } : ann))
		);
	};

	const remove = (id: string) => {
		setAnnotations(prev => prev.filter(ann => ann.id !== id));
	};

	return (
		<AnnotationContext.Provider value={{ annotations, add, update, remove }}>
			{children}
		</AnnotationContext.Provider>
	);
};

export const useAnnotations = () => {
	const context = useContext(AnnotationContext);
	if (!context) {
		throw new Error('useAnnotations must be used within AnnotationProvider');
	}
	return context;
};
