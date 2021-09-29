/* eslint-disable no-unused-vars */
import React from 'react';
import Shimmer from './Shimmer';
import './SkeletonCard.css';
import './Shimmer.css';
import SkeletonElement from './SkeletonElement';

function SkeletonCard( { theme }) {
    const themeClass = theme || 'light'
    
    return (
        <div className={`skeleton-wrapper ${themeClass}`}>
            <div className="skeleton-card">
                <SkeletonElement type="thumbnail" />
                <SkeletonElement type="title" />
                <SkeletonElement type="text" />

                <div className="skeleton-card__btm">
                    <SkeletonElement type="text" />
                    <SkeletonElement type="button" />

                </div>
            </div>

            <Shimmer />
        </div>
    )
}

export default SkeletonCard
