import React from 'react';
import './common.css';

function GenerateFont(family, size) {
    return ({color, children}) => <p className={`${family} ${size}`} style={{color: color}}>{children}</p>
}

export const LatoBold12 = GenerateFont("font-family-lato-bold","size-12");
export const LatoBold14 = GenerateFont("font-family-lato-bold", "size-14");
export const LatoRegular16 = GenerateFont("font-family-lato-regular","size-16");
export const PNova24 = GenerateFont("font-family-proxima-nova", "size-24");
export const Apple18 = GenerateFont("font-family-apple", "size-18");
export const Apple14 = GenerateFont("font-family-apple", "size-14");
export const Apple16 = GenerateFont("font-family-apple", "size-16");