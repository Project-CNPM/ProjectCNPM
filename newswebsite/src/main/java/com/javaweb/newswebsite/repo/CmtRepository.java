package com.javaweb.newswebsite.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javaweb.newswebsite.entity.CommentEntity;

public interface CmtRepository extends JpaRepository<CommentEntity, Long>{
	void deleteUserById(Long id);
	Optional<CommentEntity> findNewById(Long id);
}
