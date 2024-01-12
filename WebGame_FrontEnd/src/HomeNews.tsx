/* eslint-disable @typescript-eslint/no-unused-vars */

const HomeNews = (props:{title:string, description:string}) => {

  return (
    <div className="basis-1/3 flex">
      <div className="card card rounded-md table w-3/4 mx-auto border-solid border-8 border-gray-400 bg-gray-400 ">
        <div className="card-header">
          <div className="card-title text-2xl font-bold">{props.title}</div>
        </div>
        <div className="card-body mt-6">
          {props.description}
        </div>
      </div>
    </div>
  );
}
  
  export default HomeNews;
  