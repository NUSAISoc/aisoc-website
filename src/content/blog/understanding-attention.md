---
title: "Understanding Attention Mechanisms"
author: "David Tan"
date: "2026-02-14T10:00:00Z"
excerpt: "A deep dive into the mathematical foundations of Self-Attention and how it powers modern Transformers."
tags: ["machine-learning", "deep-learning", "nlp"]
coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000&auto=format&fit=crop"
---

## Introduction

The Transformer architecture changed everything. At its core is the **Self-Attention** mechanism.

$$
Attention(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

In this post, we'll break down:

1. Query, Key, and Value vectors
2. Scaled Dot-Product Attention
3. Multi-Head Attention

### Why "Scaled"?

We divide by $\sqrt{d_k}$ to prevent the dot products from growing too large in magnitude, which would push the softmax function into regions where it has extremely small gradients.

```python
import torch
import torch.nn.functional as F

def scaled_dot_product_attention(query, key, value):
    d_k = query.size(-1)
    scores = torch.matmul(query, key.transpose(-2, -1)) / math.sqrt(d_k)
    p_attn = F.softmax(scores, dim=-1)
    return torch.matmul(p_attn, value), p_attn
```

## Conclusion

Understanding attention is crucial for modern AI engineering. Next week, we'll implement a full Transformer from scratch.
