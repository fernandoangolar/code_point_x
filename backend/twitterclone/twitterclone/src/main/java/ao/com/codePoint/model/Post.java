package ao.com.codePoint.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Transient;
import lombok.Data;

@Entity 
@Data
public class Post {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String content;
    private String username;
    private LocalDateTime createdAt;
    private int likes;
    private int comments;
    private int retweets;

    @Transient // Não será salvo no banco
    private boolean liked;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
