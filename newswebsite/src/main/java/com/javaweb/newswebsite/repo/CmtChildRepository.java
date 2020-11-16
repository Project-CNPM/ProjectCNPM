package com.javaweb.newswebsite.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaweb.newswebsite.entity.CommentChildEntity;

public interface CmtChildRepository extends JpaRepository<CommentChildEntity, Long>{
	void deleteUserById(Long id);
	Optional<CommentChildEntity> findCommentById(Long id);
}
