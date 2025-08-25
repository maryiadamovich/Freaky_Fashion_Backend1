export default function TableRow({ product }) {

    return (
        <tr key={product.id}>
            <td>
                {product.name}
            </td>
            <td>
                {product.sku}
            </td>
            <td>
                {product.price}
            </td>
        </tr>
    );
}