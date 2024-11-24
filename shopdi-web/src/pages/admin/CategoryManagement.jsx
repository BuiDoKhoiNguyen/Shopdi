import { useEffect } from "react"
import { GET, POST } from "../../api/GET";
import CATEGORIES from "@/data/categories_data";
export default function CategoryManagement() {
    const categories = CATEGORIES.CATEGORIES
    const put = async () => {
        for(let i = 0; i < categories.length; i++) {
            const res = await POST(`categories/create`, {name:categories[i].name,parentName:null}).then((res) => {
                console.log(res)
            })
            for(let j = 0; j < categories[i].sub_categories.length; j++) {
                const res = await POST(`categories/create`, {name:categories[i].sub_categories[j],parentName:categories[i].name}).then((res) => {
                    console.log(res)
                })
            }
        }
        
    }
    useEffect(() => {
        put().then(() => {
            console.log("done")
        })

    })

    return (
        <div>
            Category Management
        </div>
    )
}