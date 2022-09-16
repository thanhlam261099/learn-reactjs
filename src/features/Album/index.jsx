import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {
    
};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'V-Pop Rising',
            thumbnailUrl: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/c/b/5/f/cb5f264ac1492d856e9e69f444d86745.jpg'
        },
        {
            id: 2,
            name: 'Nhạc Phim Âu Mỹ Chọn Lọc',
            thumbnailUrl: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/a/5/0/f/a50f785e02109cd26eab94af0a861929.jpg'
        },
        {
            id: 3,
            name: 'Today K-Pop Hits',
            thumbnailUrl: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/f/9/6/6/f96615429280ed8a264ccc319bd010e7.jpg'
        }
    ]
    return (
        <div>
            <h2>LỰA CHỌN HÔM NAY</h2>
            <AlbumList albumList={albumList} />  
        </div>
    );
}

export default AlbumFeature;