import './Login.css';
export default function SunMoon() {
    return (
        <div className='sun'>
            <div >
                <input className='slider' step='any' type='range' />
                <svg version='1.1' xmlns='http://www.w3.org/2000/svg'>
                    <defs>
                        <filter id='goovey'>
                            <feturbulence baseFrequency='.06' numOctaves='20' result='warpper' type='fractalNoise' />
                            <fecolormatrix in='warpper' type='hueRotate'>
                                <animate attributeName='values' attributeType='XML' dur='9s' repeatCount='indefinite' values='0;110;150;210;280;360' />
                            </fecolormatrix>
                            <fedisplacementmap in='SourceGraphic' scale='14' xChannelSelector='R' yChannelSelector='G' />
                        </filter>
                    </defs>
                </svg>
            </div>
        </div>
    );
}