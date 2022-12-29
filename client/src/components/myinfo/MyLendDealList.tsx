import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/customAxios';
// components
import { Pagination } from 'components/Pagination';
import GiveItemCard from './GiveItemCard';
import Loading from '../Loading';

export default function MyLendDealList() {
  const [page, setPage] = useState(1);
  const {
    isLoading,
    isError,
    data: lendDealList,
  } = useQuery(
    [`lendDealList/${page}`, `${localStorage.getItem('userId')}`],
    async () => {
      return api.get(
        `/product/page?lender=${localStorage.getItem(
          'userId',
        )}&per=8&page=${page}&stateOfTransaction=1,2`,
      );
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 5,
    },
  );

  if (isLoading) return <Loading />;

  return (
    <div className="w-4/5 p-12">
      {lendDealList?.data.docs.length > 0 ? (
        lendDealList?.data.docs.map((item: Item) => (
          <GiveItemCard key={item._id} item={item} />
        ))
      ) : (
        <div className="flex items-center justify-center h-1/2 text-xl font-bold">
          <p>게시물이 존재하지 않습니다.</p>
        </div>
      )}
      {lendDealList?.data.docs.length > 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={lendDealList?.data.totalPages}
          hasNextPage={lendDealList?.data.hasNextPage}
          hasPrevPage={lendDealList?.data.hasPrevPage}
        />
      )}
    </div>
  );
}

export type Item = {
  address: string;
  author: string;
  category: string;
  createdAt: string;
  description: string;
  hashtag: string[];
  imgUrl: string[];
  period: { start: string; end: string };
  postType: string;
  price: { priceDay: number; priceTime: number };
  stateOfTransaction: number;
  title: string;
  tradeWay: { direct: boolean; delivery: boolean };
  updateAt: string;
  _id: string;
};
