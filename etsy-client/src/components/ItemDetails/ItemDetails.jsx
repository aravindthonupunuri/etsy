export default function ItemDetails(props) {
    const { id } = props.match.params;
   return <div>
       in item page
       <p>
           {id}
       </p>
   </div>
}