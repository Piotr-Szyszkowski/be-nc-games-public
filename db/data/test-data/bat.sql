\c nc_games_test;

-- SET TIMEZONE='GMT';
-- UPDATE reviews SET votes = votes + 5
-- WHERE reviews.review_id = 13;
SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews
LEFT JOIN comments ON reviews.review_id = comments.review_id 
-- WHERE reviews.review_id = 13 
GROUP BY reviews.review_id 
-- WHERE reviews.category LIKE 'social deduction%'

ORDER BY created_at DESC;
-- JOIN comments;
/*COUNT(comments.review_id)*/
-- SELECT * FROM comments;
-- WHERE review_id = 3 
-- ORDER BY created_at DESC;
-- INSERT INTO comments (author, review_id, body) 
-- VALUES ('mallionaire', '2', 'Super gra, fantastiko') 
-- RETURNING *;
-- SELECT * FROM reviews;
