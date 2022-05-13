import LevelColours from "./colors.js";

export function CompleteButtonSVG(idNum, colourKey) {
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const attributes = {
        "viewBox":"0 0 16.668749 16.139584",
        "height":"61",
        "width":"63",
        "id" : `completebtn-${idNum}`
    }

    for (const key in attributes) {
        svgElement.setAttribute(key, attributes[key]);
    }
    
    svgElement.innerHTML = `
        <defs>
            <linearGradient
                y2="162.56343"
                x2="134.59695"
                y1="150.66994"
                x1="122.32034"
                gradientTransform="matrix(1.3121899,0,0,1.3121899,-158.33514,85.657526)"
                gradientUnits="userSpaceOnUse"
                id="btnbevel${idNum}">
                <stop
                    style="stop-color:#ffffff;stop-opacity:1"
                    offset="0"
                    class="start" />
                <stop
                    style="stop-color:${LevelColours[colourKey]};stop-opacity:1"
                    offset="1"
                    class="stop" />
            </linearGradient>
        </defs>
                
        <g
            transform="translate(0,-280.8604)">
            <ellipse
            style="fill:${LevelColours[colourKey]};fill-opacity:1;stroke:url(#btnbevel${idNum});stroke-width:1.31218994;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
            cx="8.251359"
            cy="288.97641"
            rx="7.527122"
            ry="7.351768" />
            <path
            style="opacity:0.2;fill:#333333;fill-opacity:1;stroke:#000000;stroke-width:0.14311713px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
            d="m 5.258258,289.39658 -1.5333988,1.90593 4.0603484,2.63644 5.9802654,-7.05362 -2.248988,-1.90612 -3.9868395,7.10531 z"
            />
        </g>`;
    return svgElement                
}