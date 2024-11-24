import { useEffect } from "react"
import { GET, POST } from "../../api/GET"
import dcm from "../../data/categories_data"
export default function Sidebar() {
    const categories = dcm.CATEGORIES
    useEffect(() => {
        GET('categories').then((data) => {
            if (data.result.length < 10) {
              for (let i = 0; i < categories.length; i++) {
                POST(`categories/create`, { name: categories[i].name, parentName: null }).then((res) => {
                  if (res.code === 'OK') {
                    for (let j = 0; j < categories[i].sub_categories.length; j++) {
                      POST(`categories/create`, { name: categories[i].sub_categories[j], parentName: categories[i].name }).then((res) => {
                        if (res.code === 'OK') {
                          console.log(res)
                        }
                      })
                    }
                  }
                })
              }
            }
          })
    })
    return (
        <div className="flex flex-col w-[15%] min-h-screen bg-[#F7FBFF]">
            <span>Category</span>
        </div>
    )
}