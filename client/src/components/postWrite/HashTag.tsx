import { hashTagStore } from '../../store/PostWriteStore';

export default function HashTagSection() {
  // store에서 불러오기
  const {
    hashTagInputText,
    hashTags,
    setHashTags,
    setHashTagInputText,
    deleteHashTags,
  } = hashTagStore();

  // input에 태그 입력 시 tages 배열로 저장
  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const tagInput = e.target.value;
    setHashTagInputText(tagInput);
  }

  function handleTagEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.nativeEvent.isComposing) {
      // isComposing 이 true 이면
      return; // 조합 중이므로 동작을 막는다.
    }
    if (e.key === 'Enter') {
      if (!hashTags.includes(hashTagInputText) && hashTags.length < 5) {
        setHashTags(`${hashTagInputText} `);
        setHashTagInputText('');
        return;
      } else {
        setHashTagInputText('');
      }
    }
  }

  // 해시태그 클릭 시 삭제
  function deleteHashTag(e: React.MouseEvent<HTMLDivElement>) {
    const newTages = hashTags.filter(
      (tag) => tag !== e.currentTarget.innerText,
    );
    deleteHashTags(newTages);
  }

  // 해시태그 갯수 제한 필요, 해시태그 중복 등록 막아야 함
  return (
    <section className="flex flex-col mb-4 h-[70px]">
      <div className="flex flex-row">
        <span className="w-[100px] h-10 p-3 text-center">해시태그</span>
        <div className="group/item">
          <div>
            <input
              value={hashTagInputText}
              onChange={handleTextChange}
              onKeyDown={handleTagEnter}
              type="text"
              maxLength={10}
              placeholder="10자까지 입력 가능"
              className="p-3 mr-4 w-[200px] h-10 border-solid border border-gray-300 rounded-md outline-none focus:border-b-yellow focus:border-2 transition duration-100"
            />
          </div>
          <p className="group/edit invisible group-focus-within/item:visible w-[200px] mt-2 text-[6px] text-b-text-darkgray leading-4 border-solid border border-gray-300 p-2 rounded-lg">
            엔터를 입력하면 태그를 등록 할 수 있습니다. <br />
            등록된 태그를 클릭하면 삭제됩니다. <br />
            태그는 5개까지 등록이 가능합니다.
          </p>
        </div>
        <div className="flex flex-wrap">
          {hashTags.map((tag) => (
            <div
              onClick={deleteHashTag}
              key={tag}
              className="font-[400] bg-b-yellow hover:bg-gray-200 text-white h-9 mr-2 py-2 px-4 rounded-full cursor-pointer transition duration-75"
            >
              {tag.trim()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
