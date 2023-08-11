import { CSSProperties } from 'react';

interface TeamStyle extends CSSProperties {
    '--primary': string;
    '--secondary': string;
    '--text-color': string;
    '--alt-text-color': string;
}

// export an array of button styles
export const teamStyles: TeamStyle[] = [
    {
        '--primary': 'var(--USC-east-HHH-primary)',
        '--secondary': 'var(--USC-east-HHH-secondary)', 
        '--text-color': 'var(--USC-east-HHH-text-color)',
        '--alt-text-color': 'var(--USC-east-HHH-alt-text-color)'
    },
    {
        '--primary': 'var(--USC-east-FF-primary)',
        '--secondary': 'var(--USC-east-FF-secondary)', 
        '--text-color': 'var(--USC-east-FF-text-color)',
        '--alt-text-color': 'var(--USC-east-FF-alt-text-color)'
    },
    {
        '--primary': 'var(--USC-east-LL-primary)',
        '--secondary': 'var(--USC-east-LL-secondary)', 
        '--text-color': 'var(--USC-east-LL-text-color)',
        '--alt-text-color': 'var(--USC-east-LL-alt-text-color)'
    },
    {
        '--primary': 'var(--USC-east-MM-primary)',
        '--secondary': 'var(--USC-east-MM-secondary)', 
        '--text-color': 'var(--USC-east-MM-text-color)',
        '--alt-text-color': 'var(--USC-east-MM-alt-text-color)'
    },
    {
        '--primary': 'var(--USC-north-PP-primary)',
        '--secondary': 'var(--USC-north-PP-secondary)', 
        '--text-color': 'var(--USC-north-PP-text-color)',
        '--alt-text-color': 'var(--USC-north-PP-alt-text-color)'
    },
    {
        '--primary': 'var(--USC-north-OO-primary)',
        '--secondary': 'var(--USC-north-OO-secondary)', 
        '--text-color': 'var(--USC-north-OO-text-color)',
        '--alt-text-color': 'var(--USC-north-OO-alt-text-color)'
    },
    {
        '--primary': 'var(--USC-north-DD-primary)',
        '--secondary': 'var(--USC-north-DD-secondary)', 
        '--text-color': 'var(--USC-north-DD-text-color)',
        '--alt-text-color': 'var(--USC-north-DD-alt-text-color)'
    },
    {
        '--primary': 'var(--USC-north-II-primary)',
        '--secondary': 'var(--USC-north-II-secondary)', 
        '--text-color': 'var(--USC-north-II-text-color)',
        '--alt-text-color': 'var(--USC-north-II-alt-text-color)'
    },
    {
        '--primary': 'var(--USC-south-PP-primary)',
        '--secondary': 'var(--USC-south-PP-secondary)', 
        '--text-color': 'var(--USC-south-PP-text-color)',
        '--alt-text-color': 'var(--USC-south-PP-alt-text-color)'
    },
    {
        '--primary': 'var(--USC-south-SS-primary)',
        '--secondary': 'var(--USC-south-SS-secondary)', 
        '--text-color': 'var(--USC-south-SS-text-color)',
        '--alt-text-color': 'var(--USC-south-SS-alt-text-color)'
    },
    {
        '--primary': 'var(--USC-south-MM-primary)',
        '--secondary': 'var(--USC-south-MM-secondary)', 
        '--text-color': 'var(--USC-south-MM-text-color)',
        '--alt-text-color': 'var(--USC-south-MM-alt-text-color)'
    },
    {
        '--primary': 'var(--USC-south-KDD-primary)',
        '--secondary': 'var(--USC-south-KDD-secondary)', 
        '--text-color': 'var(--USC-south-KDD-text-color)',
        '--alt-text-color': 'var(--USC-south-KDD-alt-text-color)'
    },
    {
        '--primary': 'var(--USC-west-GGG-primary)',
        '--secondary': 'var(--USC-west-GGG-secondary)', 
        '--text-color': 'var(--USC-west-GGG-text-color)',
        '--alt-text-color': 'var(--USC-west-GGG-alt-text-color)'
    },
    {
        '--primary': 'var(--USC-west-SS-primary)',
        '--secondary': 'var(--USC-west-SS-secondary)', 
        '--text-color': 'var(--USC-west-SS-text-color)',
        '--alt-text-color': 'var(--USC-west-SS-alt-text-color)'
    },
    {
        '--primary': 'var(--USC-west-PPP-primary)',
        '--secondary': 'var(--USC-west-PPP-secondary)', 
        '--text-color': 'var(--USC-west-PPP-text-color)',
        '--alt-text-color': 'var(--USC-west-PPP-alt-text-color)'
    },
    {
        '--primary': 'var(--USC-west-OT-primary)',
        '--secondary': 'var(--USC-west-OT-secondary)', 
        '--text-color': 'var(--USC-west-OT-text-color)',
        '--alt-text-color': 'var(--USC-west-OT-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-east-JCJ-primary)',
        '--secondary': 'var(--APC-east-JCJ-secondary)', 
        '--text-color': 'var(--APC-east-JCJ-text-color)',
        '--alt-text-color': 'var(--APC-east-JCJ-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-east-RR-primary)',
        '--secondary': 'var(--APC-east-RR-secondary)', 
        '--text-color': 'var(--APC-east-RR-text-color)',
        '--alt-text-color': 'var(--APC-east-RR-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-east-MM-primary)',
        '--secondary': 'var(--APC-east-MM-secondary)', 
        '--text-color': 'var(--APC-east-MM-text-color)',
        '--alt-text-color': 'var(--APC-east-MM-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-east-SS-primary)',
        '--secondary': 'var(--APC-east-SS-secondary)', 
        '--text-color': 'var(--APC-east-SS-text-color)',
        '--alt-text-color': 'var(--APC-east-SS-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-north-LSL-primary)',
        '--secondary': 'var(--APC-north-LSL-secondary)', 
        '--text-color': 'var(--APC-north-LSL-text-color)',
        '--alt-text-color': 'var(--APC-north-LSL-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-north-WW-primary)',
        '--secondary': 'var(--APC-north-WW-secondary)', 
        '--text-color': 'var(--APC-north-WW-text-color)',
        '--alt-text-color': 'var(--APC-north-WW-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-north-SPS-primary)',
        '--secondary': 'var(--APC-north-SPS-secondary)', 
        '--text-color': 'var(--APC-north-SPS-text-color)',
        '--alt-text-color': 'var(--APC-north-SPS-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-north-AA-primary)',
        '--secondary': 'var(--APC-north-AA-secondary)', 
        '--text-color': 'var(--APC-north-AA-text-color)',
        '--alt-text-color': 'var(--APC-north-AA-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-south-CC-primary)',
        '--secondary': 'var(--APC-south-CC-secondary)', 
        '--text-color': 'var(--APC-south-CC-text-color)',
        '--alt-text-color': 'var(--APC-south-CC-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-south-SSS-primary)',
        '--secondary': 'var(--APC-south-SSS-secondary)', 
        '--text-color': 'var(--APC-south-SSS-text-color)',
        '--alt-text-color': 'var(--APC-south-SSS-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-south-CCC-primary)',
        '--secondary': 'var(--APC-south-CCC-secondary)', 
        '--text-color': 'var(--APC-south-CCC-text-color)',
        '--alt-text-color': 'var(--APC-south-CCC-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-south-FSF-primary)',
        '--secondary': 'var(--APC-south-FSF-secondary)', 
        '--text-color': 'var(--APC-south-FSF-text-color)',
        '--alt-text-color': 'var(--APC-south-FSF-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-west-MM-primary)',
        '--secondary': 'var(--APC-west-MM-secondary)', 
        '--text-color': 'var(--APC-west-MM-text-color)',
        '--alt-text-color': 'var(--APC-west-MM-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-west-JJ-primary)',
        '--secondary': 'var(--APC-west-JJ-secondary)', 
        '--text-color': 'var(--APC-west-JJ-text-color)',
        '--alt-text-color': 'var(--APC-west-JJ-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-west-BAB-primary)',
        '--secondary': 'var(--APC-west-BAB-secondary)', 
        '--text-color': 'var(--APC-west-BAB-text-color)',
        '--alt-text-color': 'var(--APC-west-BAB-alt-text-color)'
    },
    {
        '--primary': 'var(--APC-west-PRP-primary)',
        '--secondary': 'var(--APC-west-PRP-secondary)', 
        '--text-color': 'var(--APC-west-PRP-text-color)',
        '--alt-text-color': 'var(--APC-west-PRP-alt-text-color)'
    }
]