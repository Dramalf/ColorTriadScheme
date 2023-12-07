import { argbFromHex, argbFromRgb, labFromArgb } from '@material/material-color-utilities';
import scheme from './scheme.json'


const labList = scheme.labList;
export class ColorTriad {
    static fromRgb({ r, g, b }) {
        const lab = labFromArgb(argbFromRgb(r, g, b))
        return ColorTriad.fromLab(lab)
    }
    static fromHex(hex) {
        const lab = labFromArgb(argbFromHex(hex))
        return ColorTriad.fromLab(lab)
    }
    static fromArgb(argb){
        const lab = labFromArgb(argb);
        return ColorTriad.fromLab(lab) 
    }
    static fromLab(lab) {
        let min = Infinity;
        let rank=[]
        for (let i = 0; i < labList.length; i++) {
            const curLab = labList[i][0]
            const deltaE = ColorTriad.deltaEpow(curLab, lab);
            rank.push({
                deltaE,labScheme:labList[i]
            })
        }
        return rank.sort((a,b)=>a.deltaE-b.deltaE).slice(0,5).map(i=>i.labScheme)
    }

    static deltaEpow(labX, labY) {
        const [lx, ax, bx] = labX;
        const [ly, ay, by] = labY;
        return (lx - ly) ** 2 + (ax - ay) ** 2 + (bx - by) ** 2
    }
}
