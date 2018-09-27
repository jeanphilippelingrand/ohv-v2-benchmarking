SELECT  
	rp.product_id2 related_product,
	(0.5 * rp.score + 0.5 * pc.score) score
FROM
	related_products rp
JOIN products p ON p.id = rp.product_id2
JOIN prefered_categories pc ON pc.category_id = p.category_id 
WHERE pc.member_id = 1
AND rp.product_id1 = 1
ORDER BY score DESC