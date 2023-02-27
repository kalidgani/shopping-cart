import path from '@/assets/images/icons/Path.svg'
import { dropdownActive } from '@/Redux/layoutSlice'
import { RootState } from '@/Redux/store'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

function Sidebar() {
    const router = useRouter()
    const {pathname} = router
    const dispatch = useDispatch()
    const isSidebar = useSelector((state : RootState) => state.layout.sidebar) 
    const dropdown = useSelector((state : RootState) => state.layout.dropdown) 

  return (
    <aside className={`sidebar-wrapper custom-scrollbar wow fadeInLeft ${isSidebar ? "open" : ''}`}>
    <div className="sidebar-content-wrapper">
        <ul className="sidebar-list">
            <li className={`sidebar-list-item has-subnav active ${dropdown ? 'open' : ''}`} id="listTem">
                <button className="sidebar-link" id="pro_toggle" onClick={() => dispatch(dropdownActive())}>
                    <Image src={path} alt="Product List" />
                    <span className="item-text">Ecommerce</span>
                </button>
                <ul>
                    <li>
                        <Link href="/" className={`sidebar-link ${pathname === '/' ? 'active' : ''}`}>Product List</Link>
                    </li>
                    <li>
                        <Link href="/add-product" className={`sidebar-link ${pathname === '/add-product' ? 'active' : ''}`}>Add Product</Link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</aside>
  )
}

export default Sidebar