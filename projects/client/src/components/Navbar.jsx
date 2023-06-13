import {
  Navbar,
  Button,
  Dropdown,
  Indicator,
  Card,
  Badge,
  Menu,
} from "react-daisyui";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import DarkButton from "@/components/DarkButton";
export default function NavComponents() {
  const navigate = useNavigate();
  return (
    <Navbar className='bg-base-300 p-5 flex flex-row justify-between w-full'>
      <Navbar.Start>
        <Button
          onClick={() => navigate("/")}
          className='text-xl normal-case'
          color='ghost'>
          <svg
            width='30'
            height='30'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            fillRule='evenodd'
            clipRule='evenodd'
            className='fill-current'>
            <path d='M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z'></path>
          </svg>
        </Button>
      </Navbar.Start>
      <Navbar.Center>
        {/*<Dropdown vertical="bottom" horizontal="center">
          <Dropdown.Toggle color="ghost" className="flex gap-3">
            Let's buy <FaChevronDown />
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-base-200 shadow-lg shadow-blue-700">
            <Menu.Item>
              <Link>
                <h1 className='font-bold'>Handphone</h1>
              </Link>
            </Menu.Item>
            <Menu.Item tabIndex={0}>
              <h1 className='font-bold'>Laptop</h1>
            </Menu.Item>
            <Menu.Item>
              <h1 className='font-bold'>Accesoris</h1>
            </Menu.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu className='p-0'>
        </Menu>*/}
        Multiwarehouse olshop
      </Navbar.Center>
      <Navbar.End className="gap-2">
        <DarkButton />
        <Dropdown className='dropdown-end'>
          <Button tabIndex={0} color='ghost' shape='circle'>
            <Indicator item={<Badge size='sm'>8</Badge>}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-7 w-7'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
            </Indicator>
          </Button>
          <Dropdown.Menu
            tabIndex={0}
            className='mt-3 card card-compact  w-52 bg-base-100 !p-0'>
            <Card.Body className='card-body'>
              <span className='font-bold text-lg'>8 Items</span>
              <span className='text-info'>Subtotal: $999</span>
              <Card.Actions>
                <Button color='primary' fullWidth>
                  View cart
                </Button>
              </Card.Actions>
            </Card.Body>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          onClick={() => navigate("/register")}
          shape='circle'
          color="ghost"
          size='md'>
          <FaUserCircle />
        </Button>
      </Navbar.End>
    </Navbar>
  );
}
