// components/Pagination.tsx
import React from 'react';

interface EditModalProps {
    currentPage: any;
    totalPages: any;
    onPageChange: any;
}

const Pagination: React.FC<EditModalProps> = ({ currentPage, totalPages, onPageChange }) => {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex w-full items-center justify-end space-x-2 mt-10">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded-full ${page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
                        }`}
                >
                    {page}
                </button>
            ))}
        </nav>
    );
};

export default Pagination;
