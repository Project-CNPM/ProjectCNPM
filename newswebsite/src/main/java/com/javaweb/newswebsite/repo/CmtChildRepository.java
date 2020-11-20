package com.javaweb.newswebsite.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.javaweb.newswebsite.entity.CommentChildEntity;

public interface CmtChildRepository extends JpaRepository<CommentChildEntity, Long> {
	void deleteUserById(Long id);
	Optional<CommentChildEntity> findCommentById(Long id);
	@Query(value = "SELECT * FROM commentchild u WHERE u.content LIKE %?1%",
			countQuery = "SELECT count(*) FROM commentchild u WHERE u.content LIKE %?1%",
			nativeQuery = true)
	public List<CommentChildEntity> search(String keyword, Pageable pageable);
}
