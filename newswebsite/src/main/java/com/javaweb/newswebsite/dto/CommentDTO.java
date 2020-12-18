package com.javaweb.newswebsite.dto;

import java.util.List;

public class CommentDTO extends AbstractDTO<CommentDTO> {
	private String content;
	private Integer status;
	private Long likes;
	private Long newId;
	private Long userId;
	private List<CommentChildDTO> commentchild;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public List<CommentChildDTO> getCommentchild() {
		return commentchild;
	}
	public void setCommentchild(List<CommentChildDTO> commentchild) {
		this.commentchild = commentchild;
	}

	public Long getLikes() {
		return likes;
	}

	public void setLikes(Long likes) {
		this.likes = likes;
	}

	public Long getNewId() {
		return newId;
	}

	public void setNewId(Long newId) {
		this.newId = newId;
	}

	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
}
