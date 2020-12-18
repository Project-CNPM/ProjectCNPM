package com.javaweb.newswebsite.dto;

public class CommentChildDTO extends AbstractDTO<CommentChildDTO> {
	 private String content;
	 private Integer status;
	 private Long commentCode;
	 
	
	public Long getCommentCode() {
		return commentCode;
	}
	public void setCommentCode(Long commentCode) {
		this.commentCode = commentCode;
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
