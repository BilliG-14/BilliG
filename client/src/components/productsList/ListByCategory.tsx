import ListItemCard from './ListItemCard';
import { PostDataType } from '../../store/PostReadStore';
type ListProps = {
  items: PostDataType[];
};
//데이터를 4개 단위로 묶어서 2차원 배열로 맡음
function chunk(data: PostDataType[], size = 4) {
  const arr = [];
  for (let i = 0; i < data.length; i += size) {
    arr.push(data.slice(i, i + size));
  }
  return arr;
}

export default function ListByCategory(props: ListProps) {
  const { items } = props;
  const chunkedItems = chunk(items, 4);
  return (
    <div className="w-full flex flex-col items-center mb-8">
      {chunkedItems.map((fourItems, i1) => (
        <div key={i1} className="w-full flex justify-start">
          {fourItems.map((item, i2) => {
            return <ListItemCard key={i2} item={item} />;
          })}
        </div>
      ))}
    </div>
  );
}
