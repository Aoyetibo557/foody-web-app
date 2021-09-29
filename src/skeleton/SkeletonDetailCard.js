import React from 'react'
import SkeletonElement from './SkeletonElement';
import './SkeletonDetailCard.css';
import Shimmer from './Shimmer';

function SkeletonDetailCard( { theme }) {
    const themeClass = theme || 'light';

    return (
        <div className = {`skeleton-wrapper ${themeClass}`}>
            <div className="skeleton-details">
                <div>
                    <SkeletonElement type="img-lg" />
                </div>

                <div>
                    <SkeletonElement type="title" />

                    <SkeletonElement type="text" />

                    <div className="detailcard__star-div">
                        <SkeletonElement type="detail-star" />
                        <SkeletonElement type="detail-star" />
                        <SkeletonElement type="detail-star" />
                        <SkeletonElement type="detail-star" />
                        <SkeletonElement type="detail-star" />
                    </div>

                    <SkeletonElement type="textbox" />
                    <SkeletonElement type="text" />
                    <div className="detailcard__btn-div">
                        <SkeletonElement type="detail-btn" />
                        <SkeletonElement type="detail-btn" />
                    </div>

                    <SkeletonElement type="div" />
                    <SkeletonElement type="div" />
                    <SkeletonElement type="div" />
                </div>
            </div>
            <Shimmer />
        </div>
    )
}

export default SkeletonDetailCard
