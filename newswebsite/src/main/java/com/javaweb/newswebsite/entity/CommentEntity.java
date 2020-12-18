package com.javaweb.newswebsite.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comment")
public class CommentEntity extends BaseEntity {

    @Column(name = "content")
    private String content;

    @Column(name = "status")
    private Integer status;

    @Column(name = "likes")
    private Long likes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "new_id")
    private NewEntity newEntity;

    @OneToMany(mappedBy = "commentEntity")
    private List<CommentChildEntity> commentChilds=new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid")
    private UserEntity userEntity;


    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public List<CommentChildEntity> getCommentChilds() {
		return commentChilds;
	}

	public void setCommentChilds(List<CommentChildEntity> commentChilds) {
		this.commentChilds = commentChilds;
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

    public NewEntity getNewEntity() {
        return newEntity;
    }

    public void setNewEntity(NewEntity newEntity) {
        this.newEntity = newEntity;
    }

    public Long getLikes() {
        return likes;
    }

    public void setLikes(Long likes) {
        this.likes = likes;
    }


}
