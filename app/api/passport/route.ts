import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    const url = req.url;
    const [, pwd] = url?.split('?')[1]?.split('=')

    console.log(process.env, 'PWDPWD')

    await Promise.resolve();
    if(pwd === process.env.PWD) {
        return NextResponse.json({ status: true  })
    } else {
        return NextResponse.json({ status: false  })
    }
}
