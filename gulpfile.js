import gulp from 'gulp';
import del from 'del';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import gwebp from 'gulp-webp';

export const clean = () => {
    return del('dist');
}

export const img = () => {
    return gulp.src('src/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imageminPngquant({
                speed: 1,
                strip: true,
                quality: [0.80, 0.85],
            }),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: false},
                    {cleanupIDs: false},
                    {removeDimensions: true},
                ]
            })
        ], {
            verbose: true,
        }))
        .pipe(gulp.dest('dist'));
}

export const webp = () => {
    return gulp.src('dist/*')
        .pipe(gwebp({quality: 75})) // Default 75.
        .pipe(gulp.dest('dist'));
}

export const watch = () => {
    gulp.watch('src/**/*', gulp.series(clean, img, webp));
}

export default gulp.series(clean, img, webp, watch);
