import { Link, useNavigate, useLocation } from 'react-router-dom';
import './MenuButton.css';
import { useQueryClient } from '@tanstack/react-query';

const MenuButton = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };
  const client = useQueryClient();

  return (
    <div className="mt-4">
      <div className="section mt-5 relative z-0">
        <Link
          to="/submain"
          className="owner"
          onClick={() => {
            client.invalidateQueries([
              'categoryLendItems/63a481d8e4222e88aa4ed713',
            ]);
            client.invalidateQueries([
              'categoryLendItems/63a16ff71027a8c93f03ade6',
            ]);
            client.invalidateQueries([
              'categoryLendItems/63a16ff01027a8c93f03ade4',
            ]);
            client.invalidateQueries([
              'categoryLendItems/63a16fe91027a8c93f03ade2',
            ]);
            client.invalidateQueries([
              'categoryLendItems/63a16fe01027a8c93f03ade0',
            ]);
            client.invalidateQueries([
              'categoryLendItems/63a16fcf1027a8c93f03addc',
            ]);
          }}
        >
          빌려주기
        </Link>
        <img className="house1" src="/img/h1.png" alt="house1" />
        <Link
          to="/submain/borrow"
          className="renter"
          onClick={() => {
            client.invalidateQueries([
              'categoryBorrowItems/63a16ff71027a8c93f03ade6',
            ]);
            client.invalidateQueries([
              'categoryBorrowItems/63a481d8e4222e88aa4ed713',
            ]);
            client.invalidateQueries([
              'categoryBorrowItems/63a16ff01027a8c93f03ade4',
            ]);
            client.invalidateQueries([
              'categoryBorrowItems/63a16fe91027a8c93f03ade2',
            ]);
            client.invalidateQueries([
              'categoryBorrowItems/63a16fcf1027a8c93f03addc',
            ]);
            client.invalidateQueries([
              'categoryBorrowItems/63a16fe01027a8c93f03ade0',
            ]);
          }}
        >
          빌리기
        </Link>
        <img className="house2" src="/img/h2.png" alt="house2" />
        <button
          className="home absolute ml-16 w-[49%] top-[-5px] z-10 transition ease-in-out hover:-translate-y--1 hover:scale-[1.1] duration-200"
          onClick={goHome}
        >
          <object data="/img/billig_black.svg" type="">
            {' '}
          </object>
        </button>
        <img className="front" src="/img/front1.png" alt="" />
        <img className="houses" src="/img/house.png" alt="vilage" />
      </div>
    </div>
  );
};

export default MenuButton;
