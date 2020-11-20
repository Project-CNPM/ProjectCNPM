package com.javaweb.newswebsite.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.javaweb.newswebsite.entity.CommentEntity;

public interface CmtRepository extends JpaRepository<CommentEntity, Long> {
	void deleteUserById(Long id);
	Optional<CommentEntity> findCommentById(Long id);
	@Query(value = "SELECT * FROM comment u WHERE u.content LIKE %?1%",
			countQuery = "SELECT count(*) FROM comment u WHERE u.content LIKE %?1%",
			nativeQuery = true)
	public List<CommentEntity> search(String keyword, Pageable pageable);
}