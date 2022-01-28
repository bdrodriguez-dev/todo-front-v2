const ListSelect = ({
  selectedList,
  handleSelectChange,
  toProperCase,
  lists,
}) => {
  return (
    <>
      <select
        value={selectedList}
        onChange={handleSelectChange}
        className={`appearance-none font-bold py-2 px-2 my-2 mr-2 rounded-md w-max border-2 border-blue-300`}
      >
        {lists.map((list) => {
          return <option key={list.name} value={list.name}>{toProperCase(list.name)}</option>;
        })}
      </select>
      {/*<Button type={`button`} buttonText={`Add new list`} variant={`neutral`} />*/}
      {/*<NewListInput handleNewList={handleNewList} />*/}
    </>
  );
};

export default ListSelect;
