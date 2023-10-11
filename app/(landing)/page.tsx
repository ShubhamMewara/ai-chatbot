import { Button } from "@/components/ui/button"     
import Link from "next/link";
const Landing = () => {
    return(
        <main>
            <Link href="/dashboard">
            Landing
            </Link>
            <div>
                <Link href="/sign-in">
                <Button>
                    Login
                </Button>
                </Link>
                <Link href="/sign-up">
                <Button>
                    Register
                </Button>
                </Link>
            </div>
        </main>
    )
}
export default Landing;