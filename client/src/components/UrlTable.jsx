function UrlTable({ urls }) {

    return (

        <table className="w-full mt-6">

            <thead>

                <tr className="border-b">

                    <th>Original URL</th>

                    <th>Short URL</th>

                    <th>Clicks</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {urls.map((url) => (

                    <tr
                        key={url.id}
                        className="border-b"
                    >

                        <td>{url.originalUrl}</td>

                        <td>{url.shortCode}</td>

                        <td>{url.clicks}</td>

                        <td>

                            Copy

                            Delete

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}

export default UrlTable;