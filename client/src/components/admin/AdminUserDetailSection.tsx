import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from 'api/customAxios';
import { AxiosError } from 'axios';
import Loading from 'components/Loading';
import ConfirmModal from 'components/Modal';
import { useCallback, useState } from 'react';
import useAdminPageStore from 'store/AdminPageStore';
type User = {
  _id: string;
  name: string;
  image: string;
  nickName: string;
  email: string;
  password: string;
  phoneNumber: string;
  postalCode: string;
  address1: string;
  address2: string;
  reports: Array<any>;
  suspension: boolean;
};

const apiUser = {
  GET: (id: string) => async () => {
    const res = await api.get(`user/${id}`);
    return res.data;
  },
  UPDATE: (id: string) => async (data: any) => {
    const res = await api.patch(`user/${id}`, data);
    return res.data;
  },
};

export default function AdminUserDetailSection() {
  const queryClient = useQueryClient();
  const selectedUserId = useAdminPageStore((state) => state.selectedUserId);
  const [isOpenSuspendModal, setOpenSuspendModal] = useState<boolean>(false);
  const onClickSuspendModal = useCallback(() => {
    setOpenSuspendModal(!isOpenSuspendModal);
  }, [isOpenSuspendModal]);
  const { isLoading, data, isError } = useQuery<User, AxiosError>(
    [`user/${selectedUserId}`],
    apiUser.GET(selectedUserId),
    {
      retry: 0, // 실패시 재호출 몇번 할지
      staleTime: 60 * 1000 * 60,
    },
  );
  const updateMutation = useMutation(apiUser.UPDATE(selectedUserId), {
    onSuccess: (_data) => {
      queryClient.invalidateQueries([`user/${selectedUserId}`]);
    },
  });
  const handleSuspend = () => {
    if (!data) return;
    updateMutation.mutate({ suspension: !data.suspension });
  };
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>데이터를 불러오지 못했습니다</p>;
  }
  return (
    <section className="w-full text-b-text-black">
      <p className="font-bold w-4/5 mx-auto text-center mt-5 text-2xl">
        사용자 상세 정보
      </p>
      <div className="w-4/5 p-12 mx-auto">
        <section className="img_nick_intro flex mb-4">
          <div className="mx-auto">
            <img
              src={
                data.image
                  ? data.image
                  : `${process.env.PUBLIC_URL}/img/default_user.png`
              }
              alt=""
              className="rounded-full h-32 w-32 object-cover mb-5"
            />
          </div>
        </section>
        <section className="user_info">
          <div className="user_name flex items-center h-18 py-4 border-b border-solid border-gray-200">
            <div className="w-40 text-lg leading-normal font-bold">
              <h3>이름</h3>
            </div>
            <div className="w-full flex items-center justify-start text-base leading-normal">
              {data.nickName}
              {data.suspension && (
                <p className="text-red-400 ml-5 text-sm italic">
                  이 계정은 정지된 계정입니다.
                </p>
              )}
            </div>
          </div>
          <div className="user_email flex items-center h-18 py-4 border-b border-solid border-gray-200">
            <div className="w-40 text-lg leading-normal font-bold">
              <h3>이메일 주소</h3>
            </div>
            <div className="w-full flex items-center justify-start text-base leading-normal">
              {data.email}
            </div>
          </div>
          <div className="user_phone flex items-center h-18 py-4 border-b border-solid border-gray-200">
            <div className="w-40 text-lg leading-normal font-bold">
              <h3>핸드폰 번호</h3>
            </div>
            <div className="w-full flex items-center justify-start text-base leading-normal">
              {data.phoneNumber}
            </div>
          </div>
          <div className="user_address flex items-center h-18 py-4 border-b border-solid border-gray-200">
            <div className="w-40 text-lg leading-normal font-bold">
              <h3>주소</h3>
            </div>
            <div className="w-full flex items-center justify-start text-base leading-normal">
              {`${data.address1} ${data.address2}`}
            </div>
          </div>
          <div className="user_penalty flex items-center h-18 py-4 border-b border-solid border-gray-200">
            <div className="w-40 text-lg leading-normal font-bold">
              <h3>신고 횟수</h3>
            </div>
            <div className="w-full flex items-center justify-start text-base leading-normal">
              {data.reports.length}
            </div>
          </div>
        </section>
        <div className="edit_btn flex justify-center mt-8">
          <button
            className="w-1/5 h-12 bg-red-400 text-white rounded-lg mr-2 hover:bg-gradient-to-tr from-red-500"
            onClick={() => setOpenSuspendModal(!isOpenSuspendModal)}
          >
            {data.suspension ? '정지해제' : '계정 정지'}
          </button>
          {isOpenSuspendModal && (
            <ConfirmModal
              title="이 계정을 정지할까요?"
              content={`${data.nickName}`}
              yesText="정지"
              yesColor="red-400"
              onClickToggleModal={onClickSuspendModal}
              onClickYes={() => handleSuspend()}
            />
          )}
        </div>
      </div>
    </section>
  );
}
