export default function TableRow({ product }) {

    if (product.kategori && !product.name && !product.sku && !product.price) {
        return (
            <tr key={product.id}>
                <td>{product.kategori}</td>
                <td></td>
                <td></td>
            </tr>
        )
    } else {
        return (
            <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}