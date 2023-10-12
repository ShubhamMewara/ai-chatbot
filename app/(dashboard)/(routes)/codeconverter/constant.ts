import * as z from "zod";
export const formSchema = z.object({
    prompt: z.string().min(1,{
        message: "prompt is required"
    }),
    lang: z.string().min(1)
})
export const programinglang = [
    {
        value: "JavaScript",
        lable: "JavaScript"
    },{
        value: "Python",
        lable: "Python"
    },{
        value: "C",
        lable: "C"
    },{
        value: "C++",
        lable: "C++"
    },{
        value: "C#",
        lable: "C#"
    },{
        value: "Java",
        lable: "Java"
    },{
        value: "Kotlin",
        lable: "Kotlin"
    },{
        value: "TypeScript",
        lable: "TypeScript"
    },
]